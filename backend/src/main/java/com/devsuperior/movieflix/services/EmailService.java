package com.devsuperior.movieflix.services;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import com.devsuperior.movieflix.dto.EmailDTO;
import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.services.exceptions.EmailException;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

@Service
public class EmailService {

	private static Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

	@Autowired
	private UserService userService;

	@Autowired
	private SendGrid sendGrid;

	@Autowired
	private MessageSource messageSource;

	@Value("${sendgrid.from.email}")
	private String sendGridFromEmail;

	@Value("${sendgrid.from.name}")
	private String sendgridFromName;

	@Value("${sendgrid.content.type}")
	private String sendGridContentType;

	public EmailDTO sendEmail(EmailDTO dto) {

		LOGGER.info("START METHOD EmailService.sendEmail: {} " + dto.getTo());

		UserDTO userDto = this.findUserByEmail(dto);		

		if (userDto != null) {

			try {

				String sendGridSubject = this.messageSource.getMessage("user.subject", null, null);

				String codeRequest = UUID.randomUUID().toString().substring(0, 15);

				userDto.setCodeRequestPassword(codeRequest);

				this.userService.updateCodeRequestPassword(userDto);

				long count = this.userService.countByCodeRequestPassword(codeRequest);

				String body = this.getEmailBody(userDto);

				Email from = new Email(sendGridFromEmail, sendgridFromName);
				Email to = new Email(dto.getTo());
				Content content = new Content(sendGridContentType, body);
				Mail mail = new Mail(from, sendGridSubject , to, content);

				Request request = new Request();

				request.setMethod(Method.POST);
				request.setEndpoint("mail/send");
				request.setBody(mail.build());

				Response response = sendGrid.api(request);

				if (response.getStatusCode() == 202 && count > 0) {

					dto.setStatusCode(response.getStatusCode());

				} else if (response.getStatusCode() >= 400 && response.getStatusCode() <= 500) {

					LOGGER.error("Error ao enviar email: " + response.getBody());
					throw new EmailException(this.messageSource.getMessage("user.email.send.error", null, null));
				}

			} catch (Exception e) {
				LOGGER.error("Error ao enviar email: " + e);
				throw new EmailException(this.messageSource.getMessage("user.email.send.error", null, null));
			}
		}

		LOGGER.info("END METHOD EmailService.sendEmail");

		return dto;
	}

    private UserDTO findUserByEmail(EmailDTO dto) {

		LOGGER.info("START METHOD EmailService.findUserByEmail: {} " + dto.getTo());

		UserDTO userDto = this.userService.findByEmail(dto.getTo());

		LOGGER.info("END METHOD EmailService.findUserByEmail");

		return userDto;
	}

    private String getEmailBody(UserDTO userDto) {    	

    	String sendGridBodyText1 = this.messageSource.getMessage("user.body.text1", null, null);

    	String sendGridBodyText2 = this.messageSource.getMessage("user.body.text2", null, null);

    	StringBuilder body = new StringBuilder();
    	body.append("<html>");
    	body.append("<body>");
    	body.append("<h3>");
    	body.append(sendGridBodyText1).append(" ").append(userDto.getName()).append(" ");
    	body.append(sendGridBodyText2).append(" ");
    	body.append("</h3>");
    	body.append("<br/>");
    	body.append("<b>").append(userDto.getCodeRequestPassword()).append("</b>");
    	body.append("</body>");
    	body.append("</html>");

    	return body.toString();
    }
}