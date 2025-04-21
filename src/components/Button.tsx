

export const PrimaryButton = ({children, onClick}: {
    children: React.ReactNode,
    onClick: () => void
}) => {
    return (
        <button 
            type="button" 
            className="text-white bg-[#007cbf] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-bold"
            onClick={onClick}
            >
                {children}
            </button>
    )
}