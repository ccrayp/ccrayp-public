export async function getData({ tableName, setData, setIsLoading, needSort = true }) {
    setIsLoading(true)
    try {
        const response = await fetch(`https://ccrayp.onrender.com/api/${tableName}/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const data = await response.json();

        let filteredData = Array.isArray(data) ? data.filter(item => item.mode) : [];
        if (needSort) 
            filteredData.sort((a, b) => b.id - a.id);
        setData(filteredData);

    } catch (error) {
        console.error("Ошибка загрузки технологий:", error)
        setData([])
    } finally {
        setIsLoading(false)
    }
}