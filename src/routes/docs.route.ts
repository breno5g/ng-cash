import express from 'express';

import swaggerUi from 'swagger-ui-express';

import swaggerDocs from './swagger.json';

const router = express.Router();

const DisableTryItOutPlugin = function (): any {
  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => false
        }
      }
    }
  };
};

const options = {
  swaggerOptions: {
    plugins: [DisableTryItOutPlugin]
  }
};

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));

export { router as docs };
