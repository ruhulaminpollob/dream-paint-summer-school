

const Loading = () => {
    return (
        <div>
            <div className="flex justify-center items-center h-full">
                <div className="border-l-4 border-yellow-300 rounded-full w-12 h-12 animate-spin"></div>
                <div className="border-r-4  border-red-500 rounded-full w-12 h-12 animate-spin absolute" ></div>
                <div className="border-b-4  border-cyan-500 rounded-full w-12 h-12 animate-spin absolute"></div>
            </div>
        </div>
    );
};

export default Loading;