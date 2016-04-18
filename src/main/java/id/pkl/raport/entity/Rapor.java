package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="rapor")
public class Rapor {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	
	@NotNull
	@Column(name="total")
	private Float total;
	
	@NotNull
	@Column(name="rataan")
	private Float rataan; 
	
	@NotNull
	@Column(name="keterangan_rapor")
	private String keteranganRapor;
	
	@OneToOne
	@JoinColumn(name="penilaian", referencedColumnName="id")
	private Penilaian penilaian;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Float getTotal() {
		return total;
	}

	public void setTotal(Float total) {
		this.total = total;
	}

	public Float getRataan() {
		return rataan;
	}

	public void setRataan(Float rataan) {
		this.rataan = rataan;
	}

	public Penilaian getPenilaian() {
		return penilaian;
	}

	public void setPenilaian(Penilaian penilaian) {
		this.penilaian = penilaian;
	}

	public String getKeteranganRapor() {
		return keteranganRapor;
	}

	public void setKeteranganRapor(String keteranganRapor) {
		this.keteranganRapor = keteranganRapor;
	}
	
	
	
}

