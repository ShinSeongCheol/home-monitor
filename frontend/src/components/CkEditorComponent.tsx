import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Autoformat, Bold, ClassicEditor, Code, Essentials, Italic, Paragraph, Strikethrough, Subscript, Superscript, TextTransformation, Underline } from "ckeditor5";
import 'ckeditor5/ckeditor5.css';

const CkEditorComponent = () => {
    return(
        <CKEditor 
            editor={ ClassicEditor }
            config={{
                licenseKey: 'GPL',
                plugins: [ Autoformat, TextTransformation, Bold, Italic, Underline, Strikethrough, Code, Subscript, Superscript, Essentials, Paragraph ],
                toolbar: {
                    items: ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikethrough', 'code', 'subscript', 'superscript'],
                },
                initialData: '<p>Hello World!</p>'
            }}
        />
    )
}

export default CkEditorComponent;