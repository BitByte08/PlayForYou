interface modalProps{
    type: string;
    title: string;
    content: string;
}
export const Modal = (props:modalProps) => {
    const {type , title, content} = props;
    if(type === "alert"){
        return (
            <div className="h-30 border-default rounded-2xl border-1 transition-all duration-500 flex flex-col p-6 background-default">
                <p>{title}</p>
                <p>{content}</p>
            </div>
        )
    }else if(type === "info"){

    }else if(type === "confirm"){

    }
}