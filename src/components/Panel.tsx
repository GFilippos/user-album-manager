import { ReactNode } from 'react';
import classNames from 'classnames';

type PanelProps = {
  children: ReactNode;
  className: string;
};

const Panel = ({ children, className, ...rest }: PanelProps) => {
  const finalClassNames = classNames('border rounded p-3 shadow bg-white w-full', className);

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
};

export default Panel;
