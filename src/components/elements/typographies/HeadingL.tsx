import cn from 'classnames';

interface HeadingLProps {
  extraClasses?: string;
  children: React.ReactNode;
  id?: string;
}

const HeadingL = ({ extraClasses, children, ...props }: HeadingLProps) => {
  return (
    <h1 className={cn('text-40 font-bold m-0', extraClasses)} {...props}>
      {children}
    </h1>
  );
};

export default HeadingL;
