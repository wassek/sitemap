import { configureSitemap } from '../../utils/configureSitemap'
import { removeSitemapConfiguration } from '../../utils/removeSitemapConfiguration'

const siteKey = 'digitall'
const sitePath = '/sites/' + siteKey
const homePagePath = sitePath + '/home'
const searchResultsPageName = 'search-results'
const searchResultsPagePath = homePagePath + '/' + searchResultsPageName
const sitemapRootPath = sitePath + '/sitemap.xml'
const dedicatedSitemapMixin = 'jseomix:sitemapResource'
const siteMapRootUrl = Cypress.config().baseUrl + sitePath
const langEn = 'en'

describe('Check sitemap.xml root file on digitall', () => {
    beforeEach('Configure sitemap for the test', () => {
        configureSitemap(sitePath, siteMapRootUrl)
    })

    afterEach('Cleanup test data', () => {
        removeSitemapConfiguration(sitePath)

        // remove the previous sitemapResource mixin added during the test to the digital page search-results
        cy.apollo({
            variables: {
                pathOrId: searchResultsPagePath,
                mixinsToRemove: dedicatedSitemapMixin,
                workspace: 'LIVE',
            },
            mutationFile: 'graphql/jcrUpdateNode.graphql',
        })
    })

    it('Generate dedicated sitemap', function () {
        // check that the sitemap root only contains the default sitemap length value
        cy.requestFindNodeInnerHTMLByName(sitemapRootPath, 'loc').then((urls) => {
            expect(urls.length).to.be.equal(3)
        })

        // add sitemapResource mixin to the digital page search-results to add dedicated sitemap
        cy.apollo({
            variables: {
                pathOrId: searchResultsPagePath,
                mixinsToAdd: dedicatedSitemapMixin,
                workspace: 'LIVE',
            },
            mutationFile: 'graphql/jcrUpdateNode.graphql',
        })

        // check that the sitemap root now contain 3 more entries (one for each active live language on digitall)
        cy.requestFindNodeInnerHTMLByName(sitemapRootPath, 'loc').then((urls) => {
            // we expect 3 new entries
            expect(urls.length).to.be.equal(6)
            let nodeItems = 0
            Cypress.$(urls).each(($idx, $list) => {
                if ($list.indexOf(searchResultsPagePath) > 0) {
                    nodeItems++
                }
            })
            // we expect that 3 new entries are well related to our dedicated sitemap page
            expect(nodeItems).to.be.equal(3)
        })
    })
})
