import { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Head from "next/head";

class Tiny extends Component {
  state = {
    mounted: false,
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  clientSideValidateTinyMceScriptExists() {
    if (typeof document !== "undefined") {
      if (document.querySelectorAll(`script[src="/scripts/tinymce/tinymce.min.js"]`).length < 1)
        throw new Error("Must import tinymce.min.js script in head of html file.");
    }
  }

  render() {
    const { mounted } = this.state;

    if (mounted) this.clientSideValidateTinyMceScriptExists();
    return (
      <div>
        <Head>
          <script type="text/javascript" src="/scripts/tinymce/tinymce.min.js"></script>
        </Head>

        <h1>Hey!</h1>
        {mounted && (
          <Editor
            id="tinyMceEditor"
            name="tinyMceEditor"
            initialValue={"<p>This is a test</p>"}
            init={{
              width: "95%",
              height: 777,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
            }}
          />
        )}
      </div>
    );
  }
}

export default Tiny;
