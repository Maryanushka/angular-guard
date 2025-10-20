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
            // Divider
            S.divider(),

            // Product Pages
            S.listItem()
              .title('Products')
              .child(
                S.list()
                  .title('Products Pages')
                  .items([
                    S.listItem()
                      .title('Al Product Pages')
                      .child(
                        S.documentList()
                          .title('All Product Pages')
                          .filter('_type == "product"')
                      ),
                    S.listItem()
                      .title('Create New Product Page')
                      .child(
                        S.document()
                          .schemaType('product')
                      ),
                  ])
              ),
            // Divider
            S.divider(),
            // Pages
            S.listItem()
              .title('Simple pages')
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
            // Divider
            S.divider(),
            // Menu
            S.listItem()
              .title('Menu')
              .child(
                S.list()
                  .title('Menu')
                  .items([
                    S.listItem()
                      .title('Menu List')
                      .child(
                        S.documentList()
                          .title('Menu List')
                          .filter('_type == "menu"')
                      ),
                    S.listItem()
                      .title('Create New Menu')
                      .child(
                        S.document()
                          .schemaType('menu')
                      ),
                  ])
              ),

            // Divider
            S.divider(),
            // Categories
            S.listItem()
              .title('Categories')
              .child(
                S.list()
                  .title('Categories')
                  .items([
                    S.listItem()
                      .title('Categories List')
                      .child(
                        S.documentList()
                          .title('Categories List')
                          .filter('_type == "categories"')
                      ),
                    S.listItem()
                      .title('Create New Categories')
                      .child(
                        S.document()
                          .schemaType('categories')
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
