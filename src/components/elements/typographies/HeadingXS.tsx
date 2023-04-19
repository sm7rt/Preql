import cn from 'classnames';

interface HeadingXSProps {
  extraClasses?: string;
  children: React.ReactNode;
}

const HeadingXS = ({ children, extraClasses, ...props }: HeadingXSProps) => {
  return (
    <h3
      className={cn('text-20 font-bold leading-7 m-0', extraClasses)}
      {...props}
    >
      {children}
    </h3>
  );
};

export default HeadingXS;
