module "ecs_task_execution_role" {
  source     = "../iam_role"
  name       = "ecs-task-execution"
  identifier = "ecs-tasks.amazonaws.com"
  policy_arn = data.aws_iam_policy.ecs_task_execution_role_policy.arn
}
resource "aws_ecs_task_definition" "main" {
  family                   = var.app_name
  cpu                      = 256
  memory                   = 512
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  container_definitions    = data.template_file.container_definitions.rendered
  execution_role_arn       = module.ecs_task_execution_role.iam_role_arn
}
resource "aws_cloudwatch_log_group" "log" {
  count = length(var.apps_name)
  name  = "/ecs/${var.app_name}/${var.apps_name[count.index]}"
}
resource "aws_lb_target_group" "main" {
  name        = var.app_name
  vpc_id      = var.vpc_id
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  health_check {
    port = 80
    path = "/"
  }
}
resource "aws_lb_listener_rule" "http_rule" {
  listener_arn = var.http_listener_arn
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.main.id
  }
  condition {
    path_pattern {
      values = ["*"]
    }
  }
}
resource "aws_lb_listener_rule" "https_rule" {
  listener_arn = var.https_listener_arn
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.main.id
  }
  condition {
    path_pattern {
      values = ["*"]
    }
  }
}
resource "aws_ecs_service" "main" {
  name            = "${var.app_name}-service"
  launch_type     = "FARGATE"
  desired_count   = "1"
  cluster         = var.cluster_name
  task_definition = aws_ecs_task_definition.main.arn
  network_configuration {
    security_groups  = [var.alb_security_group.id]
    subnets          = var.public_subnet_ids
    assign_public_ip = true
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.main.arn
    container_name   = "nginx"
    container_port   = 80
  }
}