module "network" {
  source   = "./network"
  app_name = var.app_name
}

module "acm_cloudfront" {
  domain_name = var.domain_name
  source      = "./acm"
  fqdn_name   = local.fqdn.web_name
  providers = {
    aws = aws.virginia
  }
}

module "elb" {
  source            = "./elb"
  app_name          = var.app_name
  vpc_id            = module.network.vpc_id
  public_subnet_ids = module.network.public_subnet_ids
  acm_id            = module.acm_fargate.api_acm_id
  domain_name       = var.domain_name
  fqdn_name         = local.fqdn.api_name
}

module "ecs_cluster" {
  source   = "./ecs_cluster"
  app_name = var.app_name
}

module "ecr" {
  source   = "./ecr"
  app_name = var.app_name
}

module "rds" {
  source             = "./rds"
  app_name           = var.app_name
  db_name            = var.db_name
  db_username        = var.db_username
  db_password        = var.db_password
  vpc_id             = module.network.vpc_id
  alb_security_group = module.elb.alb_security_group
  private_subnet_ids = module.network.private_subnet_ids
}

module "ecs_rails" {
  source             = "./ecs_rails"
  aws_id             = var.aws_id
  app_name           = var.app_name
  db_name            = var.db_name
  db_username        = var.db_username
  db_password        = var.db_password
  db_host            = module.rds.db_address
  master_key         = var.master_key
  vpc_id             = module.network.vpc_id
  http_listener_arn  = module.elb.http_listener_arn
  https_listener_arn = module.elb.https_listener_arn
  alb_security_group = module.elb.alb_security_group
  cluster_name       = module.ecs_cluster.cluster_name
  public_subnet_ids  = module.network.public_subnet_ids
}

module "acm_fargate" {
  domain_name = var.domain_name
  source      = "./acm"
  fqdn_name   = local.fqdn.api_name
}

module "s3" {
  source          = "./s3"
  fqdn_name       = local.fqdn.web_name
  bucket_name     = local.bucket.name
  aws_region      = var.aws_region
  certificate_arn = module.acm_cloudfront.api_acm_id
}
