export default function Spinner({ classNames }: { classNames: string }) {
  return (
    <>
      <div
        className={`animate-spin inline-block size-6 border-[3px] border-current border-t-transparent ${classNames} rounded-full dark:text-blue-500`}
        role="status"
        aria-label="loading"
      >
        {/* <span className="sr-only">{text}</span> */}
      </div>
    </>
  );
}
