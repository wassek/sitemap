/*
 * ==========================================================================================
 * =                            JAHIA'S ENTERPRISE DISTRIBUTION                             =
 * ==========================================================================================
 *
 *                                  http://www.jahia.com
 *
 * JAHIA'S ENTERPRISE DISTRIBUTIONS LICENSING - IMPORTANT INFORMATION
 * ==========================================================================================
 *
 *     Copyright (C) 2002-2021 Jahia Solutions Group. All rights reserved.
 *
 *     This file is part of a Jahia's Enterprise Distribution.
 *
 *     Jahia's Enterprise Distributions must be used in accordance with the terms
 *     contained in the Jahia Solutions Group Terms &amp; Conditions as well as
 *     the Jahia Sustainable Enterprise License (JSEL).
 *
 *     For questions regarding licensing, support, production usage...
 *     please contact our team at sales@jahia.com or go to http://www.jahia.com/license.
 *
 * ==========================================================================================
 */
package org.jahia.modules.sitemap.services;

import org.jahia.modules.sitemap.exceptions.SitemapException;

public interface SitemapService {

    Boolean sendSitemapXMLUrlPathToSearchEngines(String sitemapIndexXMLUrlPath) throws SitemapException;

    /**
     * In cluster : Send a notification to flush all cluster nodes
     * In standalone : do flush
     */
    void askForFlush();

    /**
     * Adds sitemap cache entry
     * @param key (mandatory)
     * @param sitemap (mandatory)
     * @param expiration (mandatory)
     */
    void addSitemap(String key, String sitemap, String expiration);

    /**
     * Gets sitemap entry cache value for a giving sitemap cache key.
     * @param key (mandatory)
     * @return sitemap cache content as String.
     */
    String getSitemap(String key);

}
