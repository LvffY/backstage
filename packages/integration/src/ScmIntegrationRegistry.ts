/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AwsS3Integration } from './awsS3/AwsS3Integration';
import { AzureIntegration } from './azure/AzureIntegration';
import { BitbucketIntegration } from './bitbucket/BitbucketIntegration';
import { GitHubIntegration } from './github/GitHubIntegration';
import { GitLabIntegration } from './gitlab/GitLabIntegration';
import { ScmIntegration, ScmIntegrationsGroup, ScmLocation } from './types';

/**
 * Holds all registered SCM integrations, of all types.
 *
 * @public
 */
export interface ScmIntegrationRegistry
  extends ScmIntegrationsGroup<ScmIntegration> {
  awsS3: ScmIntegrationsGroup<AwsS3Integration>;
  azure: ScmIntegrationsGroup<AzureIntegration>;
  bitbucket: ScmIntegrationsGroup<BitbucketIntegration>;
  github: ScmIntegrationsGroup<GitHubIntegration>;
  gitlab: ScmIntegrationsGroup<GitLabIntegration>;

  /**
   * Resolves an absolute or relative URL in relation to a base URL.
   *
   * This method is adapted for use within SCM systems, so relative URLs are
   * within the context of the root of the hierarchy pointed to by the base
   * URL.
   *
   * For example, if the base URL is  `<repo root url>/folder/a.yaml`, i.e.
   * within the file tree of a certain repo, an absolute path of `/b.yaml` does
   * not resolve to `https://hostname/b.yaml` but rather to
   * `<repo root url>/b.yaml` inside the file tree of that same repo.
   */
  resolveUrl(options: {
    /**
     * The (absolute or relative) URL or path to resolve.
     */
    url: string;
    /**
     * The base URL onto which this resolution happens
     */
    base: string;
    /**
     * The line number in the target file to link to, starting with 1. Only applicable when linking to files.
     */
    lineNumber?: number;
  }): string;

  /**
   * Resolves the edit URL for a file within the SCM system.
   *
   * Most SCM systems have a web interface that allows viewing and editing files
   * in the repository. The returned URL directly jumps into the edit mode for
   * the file.
   * If this is not possible, the integration can fall back to a URL to view
   * the file in the web interface.
   *
   * @param url - The absolute URL to the file that should be edited.
   */
  resolveEditUrl(url: string): string;

  /**
   * Takes a URL and parses it into its constituent parts.
   *
   * @param url - The URL to parse
   */
  parseUrl(url: string): ScmLocation;
}