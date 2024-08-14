import { forwardRef, useRef } from 'react';

export default forwardRef(function SelectInput({ className = '', children, ...props }, ref) {
    const input = ref ? ref : useRef();

    return (
        <select
            {...props}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-cyan-500 dark:focus:border-cyan-600 focus:ring-cyan-500 dark:focus:ring-cyan-600 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        >
            {children}
        </select>
    );
});
