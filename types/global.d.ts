declare global {
  interface Window {
    google?: {
      books: {
        load: () => void;
        setOnLoadCallback: (cb: () => void) => void;
        DefaultViewer: new (el: HTMLElement | null) => {
          load: (bookId: string) => void;
        };
      };
    };
  }
}

export {};
