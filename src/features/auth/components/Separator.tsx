const Separator = (): JSX.Element => {
    return (
        <div className="or flex space-x-4 items-center">
            <div className="line h-[1px] bg-border flex-1"></div>
            <p>ou</p>
            <div className="line h-[1px] bg-border flex-1"></div>
        </div>
    );
};

export default Separator;