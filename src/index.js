
console.log('edit here src/index.js')

document.querySelector("#root").innerHTML = `
<div class="content">
  <h1>Please open devtools</h1>
  <pre>
    - npm run dev
    - check Network tab, there is only 1 runtime chunk for entry main
    - edit src/index.js and save, and refresh the page
    - check Network tab, there are 2 runtime chunks for entry main. this is not expected.
  </pre>
</div>
`;
