import cn from 'classnames';
import PropTypes from 'prop-types';

interface BodyBoldXSProps {
  as: string;
  extraClasses?: string;
  children: React.ReactNode;
  href?: string;
}

const BodyBoldXS: React.FC<BodyBoldXSProps> = ({
  children,
  extraClasses,
  as = 'p',
  ...props
}) => {
  return (
    <>
      {as === 'p' && (
        <p className={cn('text-12 font-semibold m-0', extraClasses)} {...props}>
          {children}
        </p>
      )}
      {as === 'div' && (
        <div
          className={cn('text-12 font-semibold m-0', extraClasses)}
          {...props}
        >
          {children}
        </div>
      )}
      {as === 'span' && (
        <span
          className={cn('text-12 font-semibold m-0', extraClasses)}
          {...props}
        >
          {children}
        </span>
      )}
      {as === 'a' && (
        <a className={cn('text-12 font-semibold m-0', extraClasses)} {...props}>
          {children}
        </a>
      )}
    </>
  );
};

BodyBoldXS.prototype = {
  as: PropTypes.oneOf(['p', 'div', 'span', 'anchor']).isRequired,
};

export default BodyBoldXS;
