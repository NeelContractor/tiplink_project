

export const PrimaryButton = ({children, onClick}: {
    children: React.ReactNode,
    onClick: () => void
}) => {
    return (
        <button 
            type="button" 
            className="text-white bg-[#007cbf] font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-bold hover:cursor-pointer"
            onClick={onClick}
            >
                {children}
            </button>
    )
}

export const TabButton = ({ active, children, onClick }: {
    active: boolean,
    children: React.ReactNode,
    onClick: () => void
}) => {
    return <button type="button" className={`w-full text-white hover:bg-[#007cbf] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${active ? "bg-[#007cbf]" : "bg-[#5ca7cf]"}`} onClick={onClick} >{children}</button>
}