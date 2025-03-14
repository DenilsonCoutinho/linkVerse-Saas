interface PropsButton{
children?: ChildNode
text:string
className:string
}

export default function ButtonPremium({text,className }: PropsButton) {
    return (
        <>
            <button className={className}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                    <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
                </svg>
                {text}
            </button>
        </>
    )
}