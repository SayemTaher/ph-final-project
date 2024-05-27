

const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="flex flex-col mt-10 mb-10 gap-2 justify-center items-center">
            <h1 className="text-yellow-500 text-xl">--- {heading} ---</h1>
            <p className="text-4xl p-4 border-t-2 border-b-2 border-gray-200 uppercase">{subHeading}</p>
           
            
        </div>
    );
};

export default SectionTitle;