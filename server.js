import moduleAlias from "module-alias";
import next from "next";
import express from "express";
import compression from "compression";

import { IS_DEV, WEB_PORT, STATIC_PATH } from "./const";

if (!IS_DEV) {
  moduleAlias.addAlias("react", "preact-compat");
  moduleAlias.addAlias("react-dom", "preact-compat");
}

const app = next({ dev: IS_DEV });
const handle = app.getRequestHandler();

const i18nextMiddleware = require("i18next-express-middleware");
const Backend = require("i18next-node-fs-backend");
const i18n = require("./i18n");

i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      preload: ["en", "th"], // preload all languages
      ns: ["common", "landing", "home", "read", "partners", "about", "blog"], // need to preload all the namespaces
      backend: {
        loadPath: __dirname + "/locales/{{lng}}/{{ns}}.json",
        addPath: __dirname + "/locales/{{lng}}/{{ns}}.missing.json"
      }
    },
    () => {
      app.prepare().then(() => {
        const server = express();
        server.use(compression());
        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18n));

        // serve locales for client
        server.use("/locales", express.static(__dirname + "/locales"));

        // missing keys
        server.post(
          "/locales/add/:lng/:ns",
          i18nextMiddleware.missingKeyHandler(i18n)
        );

        server.use(STATIC_PATH, express.static("static"));

        server.get("/about", (req, res) => {
          return app.render(req, res, "/about", req.query);
        });

        server.get("/speakers", (req, res) => {
          return app.render(req, res, "/speakers", req.query);
        });

        server.get("/read", (req, res) => {
          return app.render(req, res, "/read", req.query);
        });

        server.get("/blog", (req, res) => {
          return app.render(
            req,
            res,
            "/blog",
            Object.assign(req.params, req.query)
          );
        });

        server.get("/watch", (req, res) => {
          return app.render(req, res, "/watch", req.query);
        });

        server.get("/partners", (req, res) => {
          return app.render(req, res, "/partners", req.query);
        });

        server.get("/robots.txt", (req, res) => {
          return res.status(200).sendFile("robots.txt", {
            root: __dirname + "/static/seo",
            headers: {
              "Content-Type": "text/plain;charset=UTF-8"
            }
          });
        });

        server.get("/sitemap.xml", (req, res) => {
          return res.status(200).sendFile("sitemap.xml", {
            root: __dirname + "/static/seo",
            headers: {
              "Content-Type": "text/xml;charset=UTF-8"
            }
          });
        });

        server.get("*", (req, res) => {
          return handle(req, res);
        });

        server.listen(WEB_PORT, err => {
          if (err) throw err;
          console.log(`=> Ready on http://localhost:${WEB_PORT}`);
        });
      });
    }
  );
