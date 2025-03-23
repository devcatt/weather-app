export type weatherDataType<T> = {
        main: {
            temp: number
            feels_like: number
            pressure: number
        },
        weather: Object | T | Array<Object>
        wind: {
            speed: number
            deg: number
        }
        clouds: { all: number }
} 