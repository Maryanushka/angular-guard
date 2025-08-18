import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'blackfox',

  projectId: '32ywkl0n',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Home Page
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),

            // Divider
            S.divider(),

            // Content Pages
            S.listItem()
              .title('Content Pages')
              .child(
                S.list()
                  .title('Content Pages')
                  .items([
                    S.listItem()
                      .title('All Content Pages')
                      .child(
                        S.documentList()
                          .title('All Content Pages')
                          .filter('_type == "contentPage"')
                      ),
                    S.listItem()
                      .title('Create New Content Page')
                      .child(
                        S.document()
                          .schemaType('contentPage')
                      ),
                  ])
              ),

            // Simple Pages
            S.listItem()
              .title('Simple Pages')
              .child(
                S.list()
                  .title('Simple Pages')
                  .items([
                    S.listItem()
                      .title('All Simple Pages')
                      .child(
                        S.documentList()
                          .title('All Simple Pages')
                          .filter('_type == "page"')
                      ),
                    S.listItem()
                      .title('Create New Simple Page')
                      .child(
                        S.document()
                          .schemaType('page')
                      ),
                  ])
              ),
          ]),
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
