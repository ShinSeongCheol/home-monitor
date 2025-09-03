import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Alignment, Autoformat, BlockQuote, Bold, ClassicEditor, Code, CodeBlock, Essentials, Font, Heading, HorizontalLine, Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, LinkImage, Indent, IndentBlock, Italic, Link, List, MediaEmbed, Paragraph, Strikethrough, Subscript, Superscript, Table, TableCellProperties, TableColumnResize, TableProperties, TableToolbar, TextTransformation, TodoList, Underline, ImageInsert, Base64UploadAdapter, ImageUpload } from "ckeditor5";
import 'ckeditor5/ckeditor5.css';
import coreTransitions from "ckeditor5/translations/ko.js";
import type { Dispatch, SetStateAction } from "react";
import styles from '../styles/CkEditorComponent.module.css'

type CkEditorProps = {
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
}

const CkEditorComponent = ({ value, onChange }: CkEditorProps) => {

    return (
        <div className={styles.editor}>
            <CKEditor
                editor={ClassicEditor}
                config={{
                    licenseKey: 'GPL',
                    plugins: [
                        Autoformat, TextTransformation, Bold, Italic, Underline, Strikethrough, Code, Subscript, Superscript, Indent,
                        IndentBlock, BlockQuote, CodeBlock, Font, Essentials, Paragraph, Heading, HorizontalLine, Link, List, TodoList,
                        MediaEmbed, Alignment, Table, TableToolbar, TableProperties, TableCellProperties, TableColumnResize,
                        Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, LinkImage, ImageInsert, Base64UploadAdapter
                    ],
                    menuBar: {
                        isVisible: true
                    },
                    toolbar: {
                        items: [
                            'heading',
                            '|',
                            'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'code',
                            '|',
                            'link', 'insertImage', 'insertTable', 'MediaEmbed',
                            '|',
                            'Alignment',
                            '|',
                            'horizontalLine', 'bulletedList', 'numberedList', 'TodoList', 'outdent', 'indent',
                            '|'
                        ],
                    },
                    image: {
                        upload: {
                            types: ['jpeg', 'png', 'gif', 'bmp', 'weep', 'tiff']
                        },
                        toolbar: [
                            'imageStyle:block',
                            'imageStyle:side',
                            '|',
                            'toggleImageCaption',
                            'imageTextAlternative',
                            '|',
                            'linkImage'
                        ],
                        insert: {
                            integrations: ['upload', 'url']
                        }
                    },
                    table: {
                        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],

                    },
                    translations: [
                        coreTransitions,
                    ],
                }}
                onChange={(event, editor) => {
                    onChange(editor.getData())
                }}
                data={value}
            />
        </div>
    )
}

export default CkEditorComponent;