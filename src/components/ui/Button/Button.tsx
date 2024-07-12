import { forwardRef } from 'react';
const style =
  'outline-none px-2 py-1 rounded-md bg-white border border-gray-200 dark:bg-zinc-800/50 dark:border-white/10 shadow-sm font-medium text-sm hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-all ring-0 ring-offset-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-zinc-900 ';
const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return <button {...props} ref={ref} className={style + props.className} />;
});

Button.displayName = 'Button';
export { style };

export default Button;
