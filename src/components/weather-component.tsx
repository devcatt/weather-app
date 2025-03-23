type WeatherComponentType = {
    content: React.ReactNode
}

export function WeatherComponent({ content }: WeatherComponentType) {
    return (
        <div className={`border border-white m-2 rounded-2xl`}>{content}</div>
    )
}