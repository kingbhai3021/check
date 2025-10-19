import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CountUpNumber = ({ 
  end, 
  start = 0, 
  duration = 2, 
  decimals = 0, 
  prefix = '', 
  suffix = '', 
  className = '',
  delay = 0
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <span ref={ref} className={className}>
      {inView && (
        <CountUp
          start={start}
          end={end}
          duration={duration}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          delay={delay}
        />
      )}
    </span>
  );
};

export default CountUpNumber;
