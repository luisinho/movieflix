package com.devsuperior.movieflix.resources;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.devsuperior.movieflix.dto.RoleDTO;
import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.dto.UserInsertDTO;
import com.devsuperior.movieflix.repositories.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class UserResourceTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private UserRepository userRepository;

	@Value("${security.oauth2.client.client-id}")
	private String clientId;

	@Value("${security.oauth2.client.client-secret}")
	private String clientSecret;

	private UserInsertDTO newUserDTO;
	private UserInsertDTO newUserVisitorDTO;
	private UserInsertDTO updateUserDTO;
		
	
	private String memberUsername;
	private String memberPassword;

	@BeforeEach
	void setUp() throws Exception {		

		this.memberUsername = "ana@gmail.com";
		this.memberPassword = "123456";

		this.newUserDTO = new UserInsertDTO();
		this.newUserDTO.setEmail("member@teste.com");
		this.newUserDTO.setName("User Member");
		this.newUserDTO.setPassword("333993");
		this.newUserDTO.setRepeatPassword("333993");
		this.newUserDTO.setIdRole(1l);

		this.newUserVisitorDTO = new UserInsertDTO();
		this.newUserVisitorDTO.setEmail("visitor@teste.com");
		this.newUserVisitorDTO.setName("User Visitor");
		this.newUserVisitorDTO.setPassword("333991");
		this.newUserVisitorDTO.setRepeatPassword("333991");

		this.updateUserDTO = new UserInsertDTO();
		this.updateUserDTO.setEmail("visitor1@teste.com");
		this.updateUserDTO.setName("User Visitor");
		this.updateUserDTO.setPassword("333991");
		this.updateUserDTO.setRepeatPassword("333991");
	}

	@Test
	public void insertShouldInsertUserWhenMemberAuthenticated() throws Exception {
		
		String accessToken = this.obtainAccessToken(this.memberUsername, this.memberPassword);
		
		String jsonBody = objectMapper.writeValueAsString(newUserDTO);
		
		long expectedCount = this.userRepository.count() + 1;
		
		ResultActions result =
				mockMvc.perform(post("/users")
						.header("Authorization", "Bearer " + accessToken)
						.content(jsonBody)
						.contentType(MediaType.APPLICATION_JSON)
						.accept(MediaType.APPLICATION_JSON));

		result.andExpect(status().isCreated());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.email").value(newUserDTO.getEmail()));
		Assertions.assertEquals(expectedCount, this.userRepository.count());
	}

	@Test
	public void insertShouldInsertUserWhenVisitorNotAuthenticated() throws Exception {

		String jsonBody = objectMapper.writeValueAsString(newUserVisitorDTO);

		long expectedCount = this.userRepository.count() + 1;

		ResultActions result =
				mockMvc.perform(post("/users")
						.content(jsonBody)
						.contentType(MediaType.APPLICATION_JSON)
						.accept(MediaType.APPLICATION_JSON));

		result.andExpect(status().isCreated());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.email").value(newUserVisitorDTO.getEmail()));
		Assertions.assertEquals(expectedCount, this.userRepository.count());
	}

	@Test
	public void updateShouldUpdateUserWhenMemberAuthenticated() throws Exception {

		String accessToken = this.obtainAccessToken(this.memberUsername, this.memberPassword);

		PageRequest pageRequest = PageRequest.of(1, 1);

		String jsonBody = objectMapper.writeValueAsString(this.updateUserDTO);

		Long id = this.userRepository.findByActiveTrue(pageRequest).getContent().get(0).getId();

		ResultActions result =
				mockMvc.perform(put("/users/" + id)
						.header("Authorization", "Bearer " + accessToken)
						.content(jsonBody)
						.contentType(MediaType.APPLICATION_JSON)
						.accept(MediaType.APPLICATION_JSON));

		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.email").value(this.updateUserDTO.getEmail()));
	}

	@Test
	public void disableShouldDisableUserWhenMemberAuthenticated() throws Exception {

		String accessToken = this.obtainAccessToken(this.memberUsername, this.memberPassword);

		PageRequest pageRequest = PageRequest.of(1, 1);

		Long id = this.userRepository.findByActiveTrue(pageRequest).getContent().get(0).getId();

		ResultActions result =
				mockMvc.perform(put("/users/disable/" + id)
						.header("Authorization", "Bearer " + accessToken)
						.contentType(MediaType.APPLICATION_JSON)
						.accept(MediaType.APPLICATION_JSON));

		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.active").value(Boolean.FALSE));
	}

	@Test
	public void findAllShouldReturnAllUserWhenMemberAuthenticated() throws Exception {

       String accessToken = obtainAccessToken(this.memberUsername, this.memberPassword);

		ResultActions result =
				mockMvc.perform(get("/users")
					.header("Authorization", "Bearer " + accessToken)
					.contentType(MediaType.APPLICATION_JSON));

		result.andExpect(status().isOk());
		Assertions.assertTrue(this.getUserListSize(result) > 0);
	}

	@Test
	public void findAllShouldReturnAllRoleWhenMemberAuthenticated() throws Exception {

       String accessToken = obtainAccessToken(this.memberUsername, this.memberPassword);

		ResultActions result =
				mockMvc.perform(get("/users/role")
					.header("Authorization", "Bearer " + accessToken)
					.contentType(MediaType.APPLICATION_JSON));

		result.andExpect(status().isOk());
		Assertions.assertTrue(this.getRoles(result).length > 0);
	}

	@Test
	public void findByIdShouldReturnUserWhenMemberAuthenticated() throws Exception {

		String accessToken = obtainAccessToken(this.memberUsername, this.memberPassword);

		PageRequest pageRequest = PageRequest.of(1, 1);

		Long id = this.userRepository.findByActiveTrue(pageRequest).getContent().get(0).getId();

		ResultActions result =
				mockMvc.perform(get("/users/" + id)
					.header("Authorization", "Bearer " + accessToken)
					.contentType(MediaType.APPLICATION_JSON));

		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.email").exists());
		result.andExpect(jsonPath("$.name").exists());
	}

	@Test
	public void findAllShouldReturnUnauthorizedWhenNotValidToken() throws Exception {

		ResultActions result =
				mockMvc.perform(get("/users/")
					.contentType(MediaType.APPLICATION_JSON));

		result.andExpect(status().isUnauthorized());
	}

	private String obtainAccessToken(String username, String password) throws Exception {

		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "password");
		params.add("client_id", clientId);
		params.add("username", username);
		params.add("password", password);

		ResultActions result = mockMvc
				.perform(post("/oauth/token").params(params).with(httpBasic(clientId, clientSecret))
						.accept("application/json;charset=UTF-8"))
				.andExpect(status().isOk()).andExpect(content().contentType("application/json;charset=UTF-8"));

		String resultString = result.andReturn().getResponse().getContentAsString();

		JacksonJsonParser jsonParser = new JacksonJsonParser();

		return jsonParser.parseMap(resultString).get("access_token").toString();
	}

	private int getUserListSize(ResultActions result) throws Exception {

		final String PATH = "content";

		String json = result.andReturn().getResponse().getContentAsString();

		ObjectMapper obj = new ObjectMapper();

		ObjectReader objectReader = obj.reader().forType(new TypeReference<List<UserDTO>>(){});

		JsonNode jsonPath = objectReader.readTree(json);

		return jsonPath.path(PATH).size();
	}

	private RoleDTO[] getRoles(ResultActions result) throws Exception {
		String json = result.andReturn().getResponse().getContentAsString();
		return objectMapper.readValue(json, RoleDTO[].class);
	}
}