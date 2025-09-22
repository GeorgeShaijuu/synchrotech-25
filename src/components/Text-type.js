'use client';

import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import './TextType.css';

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  animationInterval = 10000, // 10 seconds
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [isAnimating, setIsAnimating] = useState(false);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return '#ffffff';
    return textColors[currentTextIndex % textColors.length];
  };

  // Reset animation state
  const resetAnimation = useCallback(() => {
    setDisplayedText('');
    setCurrentCharIndex(0);
    setIsDeleting(false);
    setCurrentTextIndex(0);
    setIsAnimating(true);
  }, []);

  // Stop animation and prepare for next cycle
  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  }, []);

  // Set up the 10-second interval
  useEffect(() => {
    if (!isVisible || !loop) return;

    const startAnimationCycle = () => {
      resetAnimation();
      
      // Stop animation after a reasonable duration (8 seconds) to prepare for next cycle
      animationTimeoutRef.current = setTimeout(() => {
        stopAnimation();
      }, 8000);
    };

    // Start first animation
    const initialTimeout = setTimeout(startAnimationCycle, initialDelay);

    // Set up interval for subsequent animations
    const intervalId = setInterval(startAnimationCycle, animationInterval);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isVisible, loop, animationInterval, initialDelay, resetAnimation, stopAnimation]);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible || !isAnimating) return;

    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1) {
            // Animation cycle complete, will be reset by interval
            return;
          }

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          typingTimeoutRef.current = setTimeout(() => {}, pauseDuration);
        } else {
          typingTimeoutRef.current = setTimeout(() => {
            setDisplayedText(prev => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          typingTimeoutRef.current = setTimeout(
            () => {
              setDisplayedText(prev => prev + processedText[currentCharIndex]);
              setCurrentCharIndex(prev => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else if (textArray.length > 1) {
          typingTimeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    executeTypingAnimation();

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    isAnimating
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex]?.length || isDeleting);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `text-type ${className}`,
      ...props
    },
    <span className="text-type__content" style={{ color: getCurrentTextColor() }}>
      {displayedText}
    </span>,
    showCursor && (
      <span
        ref={cursorRef}
        className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}
      >
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;