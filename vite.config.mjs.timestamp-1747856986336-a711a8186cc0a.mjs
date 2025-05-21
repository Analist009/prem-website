// vite.config.mjs
import fs from "fs";
import { resolve } from "path";
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import handlebars from "file:///home/project/node_modules/vite-plugin-handlebars/dist/index.js";
var __vite_injected_original_dirname = "/home/project";
var componentsPropsConfig = {
  link: ["href", "rel", "target"],
  button: ["disabled", "onclick", "type"],
  input: ["disabled", "name", "placeholder", "required", "type", "value"],
  select: ["disabled", "name", "placeholder", "required", "value"],
  textarea: ["disabled", "name", "placeholder", "required", "value"]
};
var createEntryPoints = () => {
  const fileNameList = fs.readdirSync(resolve(__vite_injected_original_dirname, "./src/"));
  const htmlFileList = fileNameList.filter((file) => /.html$/.test(file));
  const inputFiles = {};
  for (let i = 0; i < htmlFileList.length; i++) {
    const file = htmlFileList[i];
    inputFiles[file.slice(0, -5)] = resolve(__vite_injected_original_dirname, "./src/" + file);
  }
  return inputFiles;
};
var metadata = JSON.parse(
  fs.readFileSync(resolve(__vite_injected_original_dirname, "./src/metadata.json"))
);
var vite_config_default = defineConfig({
  server: {
    host: true
  },
  base: "",
  root: "./src",
  publicDir: "public",
  build: {
    outDir: "../docs",
    rollupOptions: {
      external: ["gsap", "gsap/ScrollTrigger", "gsap/Draggable"],
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(-1);
          if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
            extType = "fonts";
          }
          if (/png|jpe?g|svg|gif|tiff|webp|bmp|ico/i.test(extType)) {
            extType = "images";
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: "assets/scripts/[name].js",
        entryFileNames: "assets/scripts/[name].js"
      },
      input: createEntryPoints()
    }
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__vite_injected_original_dirname, "./src/components"),
      context(pagePath) {
        return metadata[pagePath];
      },
      helpers: {
        arr: (...args) => {
          return Array.from(args).slice(0, args.length - 1);
        },
        attributes: (component, attributes, root) => {
          if (Array.isArray(componentsPropsConfig[component]) && componentsPropsConfig[component].length) {
            return Object.entries(attributes).filter(([key, value]) => {
              return componentsPropsConfig[component].includes(key) && ["string", "boolean", "number"].includes(typeof value) && (!(key in root) || root[key] !== value);
            }).map(([key, value]) => `${key}="${value}"`).join("\n");
          } else {
            console.warn(`No component config found for "${component}"`);
          }
          return null;
        },
        classes: (...classes) => {
          return classes.filter((c) => typeof c === "string" && c.trim().length > 0).join(" ");
        },
        concat: (...strings) => {
          return strings.filter((s) => typeof s === "string" && !!s).join("");
        },
        ifCond: (cond, value) => {
          if (cond)
            return value;
          return null;
        },
        obj: (obj) => {
          return obj.hash;
        },
        op: (v1, operator, v2) => {
          switch (operator) {
            case "===":
              return v1 === v2;
            case "!==":
              return v1 !== v2;
            case "<":
              return v1 < v2;
            case "<=":
              return v1 <= v2;
            case ">":
              return v1 > v2;
            case ">=":
              return v1 >= v2;
            case "&&":
              return v1 && v2;
            case "||":
              return v1 || v2;
            case "??":
              return v1 ?? v2;
            default:
              return false;
          }
        },
        json: (obj) => {
          return JSON.stringify(obj);
        }
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcHJvamVjdC92aXRlLmNvbmZpZy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcHJvamVjdC92aXRlLmNvbmZpZy5tanNcIjtpbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgaGFuZGxlYmFycyBmcm9tIFwidml0ZS1wbHVnaW4taGFuZGxlYmFyc1wiO1xuXG5jb25zdCBjb21wb25lbnRzUHJvcHNDb25maWcgPSB7XG5cdGxpbms6IFtcImhyZWZcIiwgXCJyZWxcIiwgXCJ0YXJnZXRcIl0sXG5cdGJ1dHRvbjogW1wiZGlzYWJsZWRcIiwgXCJvbmNsaWNrXCIsIFwidHlwZVwiXSxcblx0aW5wdXQ6IFtcImRpc2FibGVkXCIsIFwibmFtZVwiLCBcInBsYWNlaG9sZGVyXCIsIFwicmVxdWlyZWRcIiwgXCJ0eXBlXCIsIFwidmFsdWVcIl0sXG5cdHNlbGVjdDogW1wiZGlzYWJsZWRcIiwgXCJuYW1lXCIsIFwicGxhY2Vob2xkZXJcIiwgXCJyZXF1aXJlZFwiLCBcInZhbHVlXCJdLFxuXHR0ZXh0YXJlYTogW1wiZGlzYWJsZWRcIiwgXCJuYW1lXCIsIFwicGxhY2Vob2xkZXJcIiwgXCJyZXF1aXJlZFwiLCBcInZhbHVlXCJdLFxufTtcblxuY29uc3QgY3JlYXRlRW50cnlQb2ludHMgPSAoKSA9PiB7XG5cdGNvbnN0IGZpbGVOYW1lTGlzdCA9IGZzLnJlYWRkaXJTeW5jKHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL1wiKSk7XG5cdGNvbnN0IGh0bWxGaWxlTGlzdCA9IGZpbGVOYW1lTGlzdC5maWx0ZXIoKGZpbGUpID0+IC8uaHRtbCQvLnRlc3QoZmlsZSkpO1xuXHRjb25zdCBpbnB1dEZpbGVzID0ge307XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgaHRtbEZpbGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgZmlsZSA9IGh0bWxGaWxlTGlzdFtpXTtcblx0XHRpbnB1dEZpbGVzW2ZpbGUuc2xpY2UoMCwgLTUpXSA9IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL1wiICsgZmlsZSk7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXRGaWxlcztcbn07XG5cbmNvbnN0IG1ldGFkYXRhID0gSlNPTi5wYXJzZShcblx0ZnMucmVhZEZpbGVTeW5jKHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL21ldGFkYXRhLmpzb25cIikpLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0c2VydmVyOiB7XG5cdFx0aG9zdDogdHJ1ZSxcblx0fSxcblx0YmFzZTogXCJcIixcblx0cm9vdDogXCIuL3NyY1wiLFxuXHRwdWJsaWNEaXI6IFwicHVibGljXCIsXG5cdGJ1aWxkOiB7XG5cdFx0b3V0RGlyOiBcIi4uL2RvY3NcIixcblx0XHRyb2xsdXBPcHRpb25zOiB7XG5cdFx0XHRleHRlcm5hbDpbXCJnc2FwXCIsICdnc2FwL1Njcm9sbFRyaWdnZXInLCBcImdzYXAvRHJhZ2dhYmxlXCJdLFxuXHRcdFx0b3V0cHV0OiB7XG5cdFx0XHRcdGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG5cdFx0XHRcdFx0bGV0IGV4dFR5cGUgPSBhc3NldEluZm8ubmFtZS5zcGxpdChcIi5cIikuYXQoLTEpO1xuXHRcdFx0XHRcdGlmICgvdHRmfG90Znxlb3R8d29mZnx3b2ZmMi9pLnRlc3QoZXh0VHlwZSkpIHtcblx0XHRcdFx0XHRcdGV4dFR5cGUgPSBcImZvbnRzXCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICgvcG5nfGpwZT9nfHN2Z3xnaWZ8dGlmZnx3ZWJwfGJtcHxpY28vaS50ZXN0KGV4dFR5cGUpKSB7XG5cdFx0XHRcdFx0XHRleHRUeXBlID0gXCJpbWFnZXNcIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGBhc3NldHMvJHtleHRUeXBlfS9bbmFtZV1bZXh0bmFtZV1gO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRjaHVua0ZpbGVOYW1lczogXCJhc3NldHMvc2NyaXB0cy9bbmFtZV0uanNcIixcblx0XHRcdFx0ZW50cnlGaWxlTmFtZXM6IFwiYXNzZXRzL3NjcmlwdHMvW25hbWVdLmpzXCIsXG5cdFx0XHR9LFxuXHRcdFx0aW5wdXQ6IGNyZWF0ZUVudHJ5UG9pbnRzKCksXG5cdFx0fSxcblx0fSxcblx0cGx1Z2luczogW1xuXHRcdGhhbmRsZWJhcnMoe1xuXHRcdFx0cGFydGlhbERpcmVjdG9yeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvY29tcG9uZW50c1wiKSxcblx0XHRcdGNvbnRleHQocGFnZVBhdGgpIHtcblx0XHRcdFx0cmV0dXJuIG1ldGFkYXRhW3BhZ2VQYXRoXTtcblx0XHRcdH0sXG5cdFx0XHRoZWxwZXJzOiB7XG5cdFx0XHRcdGFycjogKC4uLmFyZ3MpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gQXJyYXkuZnJvbShhcmdzKS5zbGljZSgwLCBhcmdzLmxlbmd0aCAtIDEpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRhdHRyaWJ1dGVzOiAoY29tcG9uZW50LCBhdHRyaWJ1dGVzLCByb290KSA9PiB7XG5cdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0QXJyYXkuaXNBcnJheShjb21wb25lbnRzUHJvcHNDb25maWdbY29tcG9uZW50XSkgJiZcblx0XHRcdFx0XHRcdGNvbXBvbmVudHNQcm9wc0NvbmZpZ1tjb21wb25lbnRdLmxlbmd0aFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXMpXG5cdFx0XHRcdFx0XHRcdC5maWx0ZXIoKFtrZXksIHZhbHVlXSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdFx0XHRjb21wb25lbnRzUHJvcHNDb25maWdbY29tcG9uZW50XS5pbmNsdWRlcyhrZXkpICYmXG5cdFx0XHRcdFx0XHRcdFx0XHRbXCJzdHJpbmdcIiwgXCJib29sZWFuXCIsIFwibnVtYmVyXCJdLmluY2x1ZGVzKHR5cGVvZiB2YWx1ZSkgJiZcblx0XHRcdFx0XHRcdFx0XHRcdCghKGtleSBpbiByb290KSB8fCByb290W2tleV0gIT09IHZhbHVlKVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5tYXAoKFtrZXksIHZhbHVlXSkgPT4gYCR7a2V5fT1cIiR7dmFsdWV9XCJgKVxuXHRcdFx0XHRcdFx0XHQuam9pbihcIlxcblwiKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGBObyBjb21wb25lbnQgY29uZmlnIGZvdW5kIGZvciBcIiR7Y29tcG9uZW50fVwiYCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRjbGFzc2VzOiAoLi4uY2xhc3NlcykgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBjbGFzc2VzXG5cdFx0XHRcdFx0XHQuZmlsdGVyKChjKSA9PiB0eXBlb2YgYyA9PT0gXCJzdHJpbmdcIiAmJiBjLnRyaW0oKS5sZW5ndGggPiAwKVxuXHRcdFx0XHRcdFx0LmpvaW4oXCIgXCIpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRjb25jYXQ6ICguLi5zdHJpbmdzKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0cmluZ3MuZmlsdGVyKChzKSA9PiB0eXBlb2YgcyA9PT0gXCJzdHJpbmdcIiAmJiAhIXMpLmpvaW4oXCJcIik7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGlmQ29uZDogKGNvbmQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGNvbmQpIHJldHVybiB2YWx1ZTtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fSxcblx0XHRcdFx0b2JqOiAob2JqKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIG9iai5oYXNoO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcDogKHYxLCBvcGVyYXRvciwgdjIpID0+IHtcblx0XHRcdFx0XHRzd2l0Y2ggKG9wZXJhdG9yKSB7XG5cdFx0XHRcdFx0XHRjYXNlIFwiPT09XCI6XG5cdFx0XHRcdFx0XHRcdHJldHVybiB2MSA9PT0gdjI7XG5cdFx0XHRcdFx0XHRjYXNlIFwiIT09XCI6XG5cdFx0XHRcdFx0XHRcdHJldHVybiB2MSAhPT0gdjI7XG5cdFx0XHRcdFx0XHRjYXNlIFwiPFwiOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdjEgPCB2Mjtcblx0XHRcdFx0XHRcdGNhc2UgXCI8PVwiOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdjEgPD0gdjI7XG5cdFx0XHRcdFx0XHRjYXNlIFwiPlwiOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdjEgPiB2Mjtcblx0XHRcdFx0XHRcdGNhc2UgXCI+PVwiOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdjEgPj0gdjI7XG5cdFx0XHRcdFx0XHRjYXNlIFwiJiZcIjpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHYxICYmIHYyO1xuXHRcdFx0XHRcdFx0Y2FzZSBcInx8XCI6XG5cdFx0XHRcdFx0XHRcdHJldHVybiB2MSB8fCB2Mjtcblx0XHRcdFx0XHRcdGNhc2UgXCI/P1wiOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdjEgPz8gdjI7XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRqc29uOiAob2JqKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdH0pLFxuXHRdLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJOLE9BQU8sUUFBUTtBQUMxTyxTQUFTLGVBQWU7QUFDeEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxnQkFBZ0I7QUFIdkIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTSx3QkFBd0I7QUFBQSxFQUM3QixNQUFNLENBQUMsUUFBUSxPQUFPLFFBQVE7QUFBQSxFQUM5QixRQUFRLENBQUMsWUFBWSxXQUFXLE1BQU07QUFBQSxFQUN0QyxPQUFPLENBQUMsWUFBWSxRQUFRLGVBQWUsWUFBWSxRQUFRLE9BQU87QUFBQSxFQUN0RSxRQUFRLENBQUMsWUFBWSxRQUFRLGVBQWUsWUFBWSxPQUFPO0FBQUEsRUFDL0QsVUFBVSxDQUFDLFlBQVksUUFBUSxlQUFlLFlBQVksT0FBTztBQUNsRTtBQUVBLElBQU0sb0JBQW9CLE1BQU07QUFDL0IsUUFBTSxlQUFlLEdBQUcsWUFBWSxRQUFRLGtDQUFXLFFBQVEsQ0FBQztBQUNoRSxRQUFNLGVBQWUsYUFBYSxPQUFPLENBQUMsU0FBUyxTQUFTLEtBQUssSUFBSSxDQUFDO0FBQ3RFLFFBQU0sYUFBYSxDQUFDO0FBQ3BCLFdBQVMsSUFBSSxHQUFHLElBQUksYUFBYSxRQUFRLEtBQUs7QUFDN0MsVUFBTSxPQUFPLGFBQWEsQ0FBQztBQUMzQixlQUFXLEtBQUssTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLFFBQVEsa0NBQVcsV0FBVyxJQUFJO0FBQUEsRUFDbkU7QUFFQSxTQUFPO0FBQ1I7QUFFQSxJQUFNLFdBQVcsS0FBSztBQUFBLEVBQ3JCLEdBQUcsYUFBYSxRQUFRLGtDQUFXLHFCQUFxQixDQUFDO0FBQzFEO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsUUFBUTtBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1A7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLE1BQU07QUFBQSxFQUNOLFdBQVc7QUFBQSxFQUNYLE9BQU87QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNkLFVBQVMsQ0FBQyxRQUFRLHNCQUFzQixnQkFBZ0I7QUFBQSxNQUN4RCxRQUFRO0FBQUEsUUFDUCxnQkFBZ0IsQ0FBQyxjQUFjO0FBQzlCLGNBQUksVUFBVSxVQUFVLEtBQUssTUFBTSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQzdDLGNBQUksMEJBQTBCLEtBQUssT0FBTyxHQUFHO0FBQzVDLHNCQUFVO0FBQUEsVUFDWDtBQUNBLGNBQUksdUNBQXVDLEtBQUssT0FBTyxHQUFHO0FBQ3pELHNCQUFVO0FBQUEsVUFDWDtBQUNBLGlCQUFPLFVBQVUsT0FBTztBQUFBLFFBQ3pCO0FBQUEsUUFDQSxnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNqQjtBQUFBLE1BQ0EsT0FBTyxrQkFBa0I7QUFBQSxJQUMxQjtBQUFBLEVBQ0Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLFdBQVc7QUFBQSxNQUNWLGtCQUFrQixRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLE1BQ3ZELFFBQVEsVUFBVTtBQUNqQixlQUFPLFNBQVMsUUFBUTtBQUFBLE1BQ3pCO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUixLQUFLLElBQUksU0FBUztBQUNqQixpQkFBTyxNQUFNLEtBQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxLQUFLLFNBQVMsQ0FBQztBQUFBLFFBQ2pEO0FBQUEsUUFDQSxZQUFZLENBQUMsV0FBVyxZQUFZLFNBQVM7QUFDNUMsY0FDQyxNQUFNLFFBQVEsc0JBQXNCLFNBQVMsQ0FBQyxLQUM5QyxzQkFBc0IsU0FBUyxFQUFFLFFBQ2hDO0FBQ0QsbUJBQU8sT0FBTyxRQUFRLFVBQVUsRUFDOUIsT0FBTyxDQUFDLENBQUMsS0FBSyxLQUFLLE1BQU07QUFDekIscUJBQ0Msc0JBQXNCLFNBQVMsRUFBRSxTQUFTLEdBQUcsS0FDN0MsQ0FBQyxVQUFVLFdBQVcsUUFBUSxFQUFFLFNBQVMsT0FBTyxLQUFLLE1BQ3BELEVBQUUsT0FBTyxTQUFTLEtBQUssR0FBRyxNQUFNO0FBQUEsWUFFbkMsQ0FBQyxFQUNBLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNLEdBQUcsR0FBRyxLQUFLLEtBQUssR0FBRyxFQUN6QyxLQUFLLElBQUk7QUFBQSxVQUNaLE9BQU87QUFDTixvQkFBUSxLQUFLLGtDQUFrQyxTQUFTLEdBQUc7QUFBQSxVQUM1RDtBQUNBLGlCQUFPO0FBQUEsUUFDUjtBQUFBLFFBQ0EsU0FBUyxJQUFJLFlBQVk7QUFDeEIsaUJBQU8sUUFDTCxPQUFPLENBQUMsTUFBTSxPQUFPLE1BQU0sWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsRUFDMUQsS0FBSyxHQUFHO0FBQUEsUUFDWDtBQUFBLFFBQ0EsUUFBUSxJQUFJLFlBQVk7QUFDdkIsaUJBQU8sUUFBUSxPQUFPLENBQUMsTUFBTSxPQUFPLE1BQU0sWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRTtBQUFBLFFBQ25FO0FBQUEsUUFDQSxRQUFRLENBQUMsTUFBTSxVQUFVO0FBQ3hCLGNBQUk7QUFBTSxtQkFBTztBQUNqQixpQkFBTztBQUFBLFFBQ1I7QUFBQSxRQUNBLEtBQUssQ0FBQyxRQUFRO0FBQ2IsaUJBQU8sSUFBSTtBQUFBLFFBQ1o7QUFBQSxRQUNBLElBQUksQ0FBQyxJQUFJLFVBQVUsT0FBTztBQUN6QixrQkFBUSxVQUFVO0FBQUEsWUFDakIsS0FBSztBQUNKLHFCQUFPLE9BQU87QUFBQSxZQUNmLEtBQUs7QUFDSixxQkFBTyxPQUFPO0FBQUEsWUFDZixLQUFLO0FBQ0oscUJBQU8sS0FBSztBQUFBLFlBQ2IsS0FBSztBQUNKLHFCQUFPLE1BQU07QUFBQSxZQUNkLEtBQUs7QUFDSixxQkFBTyxLQUFLO0FBQUEsWUFDYixLQUFLO0FBQ0oscUJBQU8sTUFBTTtBQUFBLFlBQ2QsS0FBSztBQUNKLHFCQUFPLE1BQU07QUFBQSxZQUNkLEtBQUs7QUFDSixxQkFBTyxNQUFNO0FBQUEsWUFDZCxLQUFLO0FBQ0oscUJBQU8sTUFBTTtBQUFBLFlBQ2Q7QUFDQyxxQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNEO0FBQUEsUUFDQSxNQUFNLENBQUMsUUFBUTtBQUNkLGlCQUFPLEtBQUssVUFBVSxHQUFHO0FBQUEsUUFDMUI7QUFBQSxNQUNEO0FBQUEsSUFDRCxDQUFDO0FBQUEsRUFDRjtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
