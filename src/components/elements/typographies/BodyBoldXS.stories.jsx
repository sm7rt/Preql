import BodyBoldXS from './BodyBoldXS.tsx';

export default {
  component: BodyBoldXS,
  title: 'BodyBoldXS Component',
};

export const BodyBoldXSStory = ({ children, ...args }) => {
  return <BodyBoldXS {...args}> {children}</BodyBoldXS>;
};

BodyBoldXSStory.args = {
  as: 'p',
  children: 'Test Text',
};
