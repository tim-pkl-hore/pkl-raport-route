package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="tingkat")
public class Tingkat {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	
	@NotNull
	@Column(name="tingkat", unique = true)
	private String tingkat;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTingkat() {
		return tingkat;
	}

	public void setTingkat(String tingkat) {
		this.tingkat = tingkat;
	}	
}
