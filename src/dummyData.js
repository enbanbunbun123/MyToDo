import { v4 as uuidv4 } from "uuid"

const dummyDate = [
    {
        id: uuidv4(),
        title: "今からやること",
        tasks: [
            {
                id: uuidv4(),
                title: "reactの勉強",
            },
            {
                id: uuidv4(),
                title: "youtubeで勉強",
            },
            {
                id: uuidv4(),
                title: "散歩",
            },
        ],
    },
    {
        id: uuidv4(),
        title: "今後やること",
        tasks: [
            {
                id: uuidv4(),
                title: "typeScriptの勉強",
            },
            {
                id: uuidv4(),
                title: "スマホで勉強",
            },
            {
                id: uuidv4(),
                title: "ランニング",
            },
        ],
    },
    {
        id: uuidv4(),
        title: "完了済み",
        tasks: [
            {
                id: uuidv4(),
                title: "gitの勉強",
            },
            {
                id: uuidv4(),
                title: "教科書で勉強",
            },
            {
                id: uuidv4(),
                title: "風呂",
            },
        ],
    },
];

export default dummyDate;
