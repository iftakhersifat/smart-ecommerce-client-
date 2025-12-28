@import "tailwindcss";
@plugin "daisyui";

@custom-variant dark (&:is(.dark, .dark *));

@theme {
  --color-dark-bg: #0a0a0a;
}

:root {
  color-scheme: light;
}

:root[data-theme='dark'] {
  color-scheme: dark;
}

* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}