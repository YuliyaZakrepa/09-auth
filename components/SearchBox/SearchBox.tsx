'use client'
import css from "./SearchBox.module.css"
interface SearchBoxProps{
    onSearch: (search:string)=>void,
}
export default function SearchBox({onSearch}:SearchBoxProps){
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        onSearch(event.target.value)
    }
return (<input
  className={css.input}
  type="text"
  placeholder="Search notes"
  onChange={handleChange}
 />)
}