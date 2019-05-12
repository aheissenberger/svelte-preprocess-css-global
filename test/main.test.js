const preprocessCssGlobal = require("../src/index.js");
const fs = require("fs");
jest.mock("fs");

describe("main", () => {
  it("add global scope", async () => {
    /*
    <style global type="text/postcss">
    body{background-color:black}
    </style>

    '*/
    const params = {
      attributes: {
        type: "text/postcss",
        global: true
      },
      content: "body{background-color:black;} div a {color: red;}",
      filename: "test.svelte"
    };

    const prepocessor = preprocessCssGlobal({});
    const result = await prepocessor(params);
    expect(result).toMatchObject({
      code: ":global(body){background-color:black;} :global(div) a {color: red;}"
    });
    // toMatchSnapshot({map: expect.any(Object)});
  });

  it("import css from file", async () => {
    /*
    <style global type="text/postcss" src="global.css"></style>
    '*/

    const srcDir = "/tmp/src/";
    const GlobalCss = "css/global.css";

    const params = {
      attributes: {
        type: "text/postcss",
        global: true,
        src: GlobalCss
      },
      content: "",
      filename: srcDir + "test.svelte"
    };

    fs.readFileSync.mockReturnValue("body{background-color:black}");

    const prepocessor = preprocessCssGlobal({});
    const result = await prepocessor(params);

    const expectedFilename = srcDir + GlobalCss;

    expect(fs.readFileSync).toHaveBeenCalledWith(expectedFilename, "utf8");
    expect(result).toMatchObject({
      code: ":global(body){background-color:black}"
    });
    // toMatchSnapshot({map: expect.any(Object)});
  });

  it("throw error on broken css", async () => {
    /*
    <style global type="text/postcss">
    body{background-color:black
    </style>

    '*/
    const params = {
      attributes: {
        type: "text/postcss",
        global: true
      },
      content: "body:{background-color:black",
      filename: "test.svelte"
    };

    const prepocessor = preprocessCssGlobal({});
    expect.assertions(1);
    try {
      await prepocessor(params);
    } catch (e) {
      expect(e.message).toMatch(/Unclosed block/)
    }
  });
});
