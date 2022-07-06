variable "aws_id" {}
variable "aws_access_key_id" {}
variable "aws_secret_access_key_id" {}
variable "aws_region" {}
variable "domain_name" {}
variable "app_name" {}
variable "db_name" {}
variable "db_username" {}
variable "db_password" {}
variable "master_key" {}
variable "db_database" {}



locals {
  name_prefix = "test-"
  fqdn = {
    web_name = "web.${var.domain_name}",
    api_name = "api.${var.domain_name}"
  }
  bucket = {
    name = local.fqdn.web_name
  }
}
