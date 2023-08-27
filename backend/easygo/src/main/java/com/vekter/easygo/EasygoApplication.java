package com.vekter.easygo;

import com.vekter.easygo.models.Analytics;
import com.vekter.easygo.repositories.AnalyticsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class EasygoApplication {

	public static void main(String[] args) {
		SpringApplication.run(EasygoApplication.class, args);
	}


	@Bean
	CommandLineRunner runner(AnalyticsRepository analyticsRepository) {
		return args -> {
			analyticsRepository.findAnalyticsByCode("analytics").ifPresentOrElse(
					analytics -> {
						System.out.println("Analytics Is Present.");
					},
					() -> {
						System.out.println("Initializing analytics...");
						Analytics analytics = new Analytics(
								null,
								"analytics",
								0,
								0,
								0,
								0,
								0,
								0,
								0.0,
								"",
								""
						);
						analyticsRepository.insert(analytics);
						System.out.println("Analytics Object Created.");
					}
			);
		};
	}

}
