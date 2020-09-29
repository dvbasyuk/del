import React, { useState } from 'react'
import s from './Paginator.module.css';
import cn from "classnames";

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onCangePage: (pageNamber: number) => void
    portionSize?: number
}

const Paginator: React.FC<PropsType> = ({ totalItemsCount, pageSize, currentPage, onCangePage, portionSize = 10 }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++)
        pages.push(i)

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={s.paginator}>
            {portionNumber > 1 &&
                <button onClick={() => { setPortionNumber(portionNumber - 1) }}> {'<<'} </button>
            }
            {
                pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => <span className={cn({
                        [s.selectedPage]: currentPage === p
                    }, s.pageNamber)}
                        key={p}
                        onClick={() => { onCangePage(p) }}>{p}</span>)
            }
            {portionNumber < portionCount &&
                <button onClick={() => { setPortionNumber(portionNumber + 1) }}> {'>>'} </button>
            }
        </div>
    )
}


export default Paginator