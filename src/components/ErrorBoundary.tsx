import React from 'react';

export default class ErrorBoundary extends React.Component<
  { children: any },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex h-screen w-full items-center justify-center bg-red-500">
          <h1>
            Oh no 😀 it crash. Check logs now or{' '}
            <a
              href={`https://stackoverflow.com/search?q=${
                this.state.error?.message
                  ? this.state.error?.message.split(' ').join('+')
                  : 'help+me'
              }`}
              className="italic text-blue-500 underline"
            >
              click this link
            </a>
          </h1>
        </div>
      );
    }

    return this.props.children;
  }
}
