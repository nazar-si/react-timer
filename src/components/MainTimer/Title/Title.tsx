export default function Title({content} : {content:string}) {
    return (
      <div className="flex justify-center w-80 sm:w-96">
        <h1 className="text-7xl sm:text-8xl md:text-9xl -mt-20 mb-10 font-bold text-gray-200 dark:text-black/50 pointer-events-none select-none">
          {content}
        </h1>
      </div>
    );
  }