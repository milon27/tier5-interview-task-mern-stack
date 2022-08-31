import MySelect from '../form/MySelect'

interface IMySelectGender {
    title?: string,
    gender: string,
    onSelect: (value: string) => void
}

export default function MySelectGender({ title = "Filter By Gender?", gender, onSelect }: IMySelectGender) {
    return (
        <>
            <MySelect
                label={title}
                value={gender}
                options={[
                    {
                        id: "MALE",
                        title: "MALE",
                        value: "MALE"
                    },
                    {
                        id: "FEMALE",
                        title: "FEMALE",
                        value: "FEMALE"
                    },
                    {
                        id: "OTHER",
                        title: "OTHER",
                        value: "OTHER"
                    }
                ]}
                onSelect={(item) => {
                    onSelect(item.value)
                }}
            />
        </>
    )
}
