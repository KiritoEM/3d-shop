const Separator = (): JSX.Element => {
    return (
        <div className="or flex items-center space-x-4">
            <div className="line bg-border h-[1px] flex-1"></div>
            <p>ou</p>
            <div className="line bg-border h-[1px] flex-1"></div>
        </div>
    );
};

export default Separator;
