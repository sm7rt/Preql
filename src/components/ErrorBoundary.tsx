import { Component, ReactNode } from 'react';
export const errorMsg = 'Something went wrong!';
export class ErrorBoundary extends Component<
  {
    children: ReactNode;
  },
  { hasError: boolean }
> {
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  shouldComponentUpdate(): boolean {
    return true;
  }

  componentDidCatch(_error, _errorInfo) {
    console.error(_error, _errorInfo);
  }
  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return <h1>{errorMsg}</h1>;
    }

    return children;
  }
}
