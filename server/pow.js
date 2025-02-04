export const rr = (obj) => {
    const arr = [
        {
            cname: 'spacex',
            budget: "3000b",
        },
        {
            cname: 'i',
            budget: "1000b",
        },
        {
            cname: 'ssdfspacex',
            budget: "2000b",
        },
    ]

    arr.splice(obj,1,"dfg")
    return arr
}