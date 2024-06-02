import TagCreate from "@/app/components/tag/TagCreate";
import TagList from "@/app/components/tag/TagList";

export default function AdminTags(){
    return(
        <div className="container">
            <TagCreate/>
            <TagList/>
        </div>
    )
}